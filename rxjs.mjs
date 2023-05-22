const { Observable, fromEvent, timer, Subject, BehaviorSubject, merge, interval, EMPTY, throwError, forkJoin, mergeMap, catchError, of, delay } = rxjs
const { map, switchMap, scan, takeWhile, takeUntil, startWith, repeat } = rxjs.operators;

console.log(`\n\n\n`);

let forkExample = (sessionDelay = 0, jwtDelay = 0) => {
	let fork = forkJoin([
		of(`session`).pipe(
			delay(sessionDelay),
			map(() => {
				throw new Error(`session error`)
			})
		),
		of(`jwt`).pipe(
			delay(jwtDelay),
			map(() => {
				throw new Error(`jwt error`)
			})
		)
	]).pipe(
		mergeMap(async ([obs, obs2]) => {
			console.log(`mergeMap: ${obs}, ${obs2}`)
		}),
		catchError((error) => {
			console.log(`error message: `, error.message)
			return throwError(error.message);
		})
	);

	fork.subscribe({
		next: () => {console.log(`success`)},
		error: (msg) => {console.log(msg); console.log(`\n\n`)},
		complete: () => {console.log(`Complete\n\n`)}
	});
}

let forkExampleWithCatchError = (sessionDelay = 0, jwtDelay = 0) => {
	let fork = forkJoin([
		of(`session`).pipe(
			delay(sessionDelay),
			map(() => {
				throw new Error(`session error`)
			}),
			catchError((error) => {
				return throwError(error);
			})
		),
		of(`jwt`).pipe(
			delay(jwtDelay),
			map(() => {
				throw new Error(`jwt error`)
			}),
			catchError(err => of(err.status))
		)
	]).pipe(
		mergeMap(async ([obs, obs2]) => {
			console.log(`mergeMap: ${obs}, ${obs2}`)
		}),
		catchError((error) => {
			console.log(`error message: `, error.message)
			return throwError(error.message);
		})
	);

	fork.subscribe({
		next: () => {console.log(`success`)},
		error: (msg) => {console.log(msg), console.log(`\n\n`)},
		complete: () => {console.log(`Complete\n\n`)}
	});
}

forkExample(0, 0);
forkExample(50, 0);
forkExample(0, 50);
forkExampleWithCatchError(0,0)
forkExampleWithCatchError(50,0)
forkExampleWithCatchError(0,50)