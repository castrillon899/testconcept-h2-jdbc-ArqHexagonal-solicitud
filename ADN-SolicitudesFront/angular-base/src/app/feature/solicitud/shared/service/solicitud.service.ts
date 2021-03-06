import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../model/solicitud';

@Injectable()
export class SolicitudService {
  constructor(private http: HttpService) {}

  solicitudActiva: Solicitud;

  seleccionarSolicitud(solicitudActiva: Solicitud) {
    this.solicitudActiva = solicitudActiva;
    return this.solicitudActiva;
  }

  public consultar() {
    return this.http.doGet<Solicitud[]>(
      `${environment.endpoint}/api/v1/solicitudes`,
      this.http.optsName('consultar solicitudes')
    );
  }

  public crear(solicitud: Solicitud) {
    return this.http.doPost<Solicitud, any>(
      `${environment.endpoint}/api/v1/solicitudes`,
      solicitud,
      this.http.optsName('crear/actualizar solicitudes')
    );
  }

  public eliminar(solicitud: Solicitud) {
    const objectUpdate = {
      estado: 'CANCELADA',
      respuestaSolicitud: solicitud.respuestaDeLaSolicitud,
    };
    return this.http.doPut<any, any>(
      `${environment.endpoint}/api/v1/solicitudes/${solicitud.id}`,
      objectUpdate,
      this.http.optsName('cancelar solicitud')
    );
  }

  public editar(solicitud: Solicitud) {
    const objectUpdate = {
      estado: solicitud.estado,
      respuestaSolicitud: solicitud.respuestaSolicitud,
    };

    return this.http.doPut<any, any>(
      `${environment.endpoint}/api/v1/solicitudes/${solicitud.id}`,
      objectUpdate,
      this.http.optsName('editar solicitud')
    );
  }
}
