import { TestBed, inject } from '@angular/core/testing';
import { SolicitudDeDepositoService } from './solicitudDeDepositoService';



describe('SolicitudDeDepositoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolicitudDeDepositoService]
    });
  });

  it('should be created', inject([SolicitudDeDepositoService], (service: SolicitudDeDepositoService) => {
    expect(service).toBeTruthy();
  }));
});
