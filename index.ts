async function checkPerformance(
  millis: number,
  cb: (...args: unknown[]) => unknown
): Promise<void> {
  let times = 0;
  let sum = 0;
  do {
    const t1 = performance.now();
    await cb();
    const t2 = performance.now();
    const nextTime = sum + (t2 - t1);
    if (nextTime >= millis) {
      console.log({
        totalCalls: times,
        totalTime: sum,
      });

      return;
    }
    sum = nextTime;
    times += 1;
  } while (sum <= millis);
}
