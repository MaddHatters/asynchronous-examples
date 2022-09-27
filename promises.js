// Utilities
function getRadioValue() {
    var radioButtonGroup = document.getElementsByName('operationResult');

    for(i = 0; i < radioButtonGroup.length; i++) {
        if(radioButtonGroup[i].checked)
            return radioButtonGroup[i].value;
    }
}

function isSuccess() {
    return getRadioValue() === 'SUCCEED';
}


/*
    Callbacks
*/
let doCallbackGreatnessButton = document.getElementById('doCallbackGreatness');

doCallbackGreatnessButton.addEventListener('click', (event) => {
    doCallbackGreatness (
        (successMessage) => {
            console.log(`Success callback: ${successMessage}`);
        },
        (errorMessage) => {
            console.log(`Error callback: ${errorMessage}`);
        },
    )
});

function doCallbackGreatness(success, error) {
    const succeeded = isSuccess();
    if(succeeded) {
        success('We succeeded');
    } else {
        error('We failed');
    }
}



/*
    Promises Basic

    promise
        .then()
        .catch()
        .finally()

*/

let promise = new Promise((resolve, reject) => {
    let a = 1 + 1
    if(a == 2) {
        resolve('Success');
    } else {
        reject('Failed');
    }
});


// Execute Promise
promise
    .then((message) => {
        console.log(`in success then callback: ${message}`);
    })
    .catch((error) => {
        console.log(`in error catch callback  ${error}`)
    })
    .finally((message) => {
        console.log(`Finally runs every time: ${message}`)
    })



/*
    Promises
*/
let doPromiseAwesomenessButton = document.getElementById('doPromiseAwesomeness');
doPromiseAwesomenessButton.addEventListener(
    'click',
    async (event) => {
        doPromiseAwesomenessAsync(isSuccess())
            .then((message) => {
                console.log(`In then success: ${message}`);
            }).catch((error) => {
                console.log(`In catch error: ${error}`)
            }).finally(_ => {
                console.log(`In finally block that runs every time regardless of outcome`)
            })
    }
);

async function doPromiseAwesomenessAsync(succeeded) {
    return new Promise((resolve, reject) => {
        if(succeeded) {
            resolve('Success');
        } else {
            reject('Failed');
        }
    });
}



// How promises solve the callback issues
// Avoid Callback Hell


// How do we run promises in parallel?
// Enter promise.all
/*
    Promise.all([
        promise1,
        promise2,
        promise3
    ])
*/

let doParallelWorkButton = document.getElementById('doParallelWork');
doParallelWorkButton.addEventListener(
    'click',
    async (event) => {
        const succeeded = isSuccess();
        Promise.all([
            requestOneAsync(succeeded),
            requestTwoAsync(succeeded),
            requestThreeAsync(succeeded)
        ])
        .then((messages) => {
            console.log(`PARALLEL: In then success:`, messages);
        }).catch((errors) => {
            console.log(`PARALLEL: In catch error:`, errors)
        }).finally(_ => {
            console.log(`PARALLEL: In finally block that runs every time regardless of outcome`)
        })
    }
);

async function requestOneAsync(succeeded) {
    return new Promise((resolve, reject) => {
        if(succeeded) {
            resolve('Request One Succeeded');
        } else {
            reject('Request One Failed');
        }
    });
}

async function requestTwoAsync(succeeded) {
    return new Promise((resolve, reject) => {
        if(succeeded) {
            resolve('Request Two Succeeded');
        } else {
            reject('Request Two Failed');
        }
    });
}

async function requestThreeAsync(succeeded) {
    return new Promise((resolve, reject) => {
        if(succeeded) {
            resolve('Request Three Succeeded');
        } else {
            reject('Request Three Failed');
        }
    });
}