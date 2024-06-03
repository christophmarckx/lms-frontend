import { ProcessErrorPipe } from './process-error.pipe';

describe('ProcessErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ProcessErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
