import { LoadingOverlayModule } from './loading-overlay.module';

describe('LoadingOverlayModule', () => {
  let loadingOverlayModule: LoadingOverlayModule;

  beforeEach(() => {
    loadingOverlayModule = new LoadingOverlayModule();
  });

  it('should create an instance', () => {
    expect(loadingOverlayModule).toBeTruthy();
  });
});
