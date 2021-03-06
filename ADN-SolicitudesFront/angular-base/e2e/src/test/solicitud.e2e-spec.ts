import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { SolicitudPage } from '../page/solicitud/solicitud.po';

describe('workspace-project Solicitud', () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let solicitud: SolicitudPage;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    solicitud = new SolicitudPage();
    browser.driver.manage().window().maximize();
  });

  it('Deberia crear Solicitud', () => {
    const ID_CLIENTE = '001';
    const CELULAR = '001';
    const TIPO_SOLICITUD = 'QUEJA';
    const DESCRIPCION = 'PRUEBAS QUEJA';

    page.navigateTo();
    navBar.clickSolicitud();
    solicitud.clickLinkBotonCrear();
    solicitud.ingresarIdCliente(ID_CLIENTE);
    solicitud.ingresarClienteCelularContacto(CELULAR);
    solicitud.ingresarTipoDeSolicitud(TIPO_SOLICITUD);
    solicitud.ingresarDescripcion(DESCRIPCION);

    browser.sleep(1000);
    solicitud.clickBotonCrear();
    browser.sleep(1000);

    solicitud.clickBotonOK();

    expect(solicitud.obtenerTextoSweetAlert()).toContain('Se creo el radicado');
  });

  it('Deberia Actualizar solicitud', () => {
    const RESPUESTA_SOLICITUD = 'ESTO ES UNA ACTUALIZACION DESDE e2e';
    const date: Date = new Date();

    page.navigateTo();
    browser.sleep(1000);

    navBar.clickSolicitud();
    browser.sleep(1000);

    solicitud.clickBotonListarSolicitudes();

    browser.sleep(1000);
    solicitud.clickEditarPrimeraSolicitud();
    solicitud.clickEditarPrimeraSolicitud();
    browser.sleep(1000);
    solicitud.ingresarRespuestaSolicitud(RESPUESTA_SOLICITUD + date);
    solicitud.clickBotonActualizar();
    solicitud.clickBotonActualizarModal();
    expect(solicitud.obtenerTextoSweetAlert()).toContain(
      'Se actualizado el radicado'
    );
  });

  it('Deberia listar solicitudes', () => {
    page.navigateTo();
    navBar.clickSolicitud();
    solicitud.clickBotonListarSolicitudes();
  });
});
