import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Registro from './modules/Registro/Registro'
import CodigoVerificacion from './modules/Registro/CodigoVerificacion'
import CodigoVerificacionAPI from './modules/Registro/CodigoVerificacionAPI'
import InformacionPersonal from './modules/Registro/InformacionPersonal'
import InformacionAPI from './modules/Registro/InformacionAPI'
import ConfigurarContrasena from './modules/Registro/ConfigurarContrasena'
import Legal from './modules/Registro/Politica/Legal'
import Privacidad from './modules/Registro/Politica/Privacidad'
import TerminosyCondiciones from './modules/Registro/Politica/TerminosyCondiciones'
import NavigationDrawer from './modules/Principal/containers/NavigationDrawer'
import Efectivo from './modules/Pago/Efectivo'
import Tarjeta from './modules/Pago/Tarjeta'
import InformacionPago from './modules/Pago/InformacionPago'
import Informacion from './modules/Configuracion/Informacion Personal/Informacion'
import Camera from './modules/Configuracion/Informacion Personal/Camera'
import CargarFoto from './modules/Configuracion/Informacion Personal/CargarFoto'
import ContactoConfianza from './modules/CentroSeguridad/Contactos Confianza/ContactoConfianza'
import AgregarContacto from './modules/CentroSeguridad/Contactos Confianza/AgregarContacto'
import ListaContacto from './modules/CentroSeguridad/Contactos Confianza/ListaContacto'
import Contrasena from './modules/Configuracion/Informacion Personal/Contrasena'
import EliminarCuenta from './modules/Configuracion/Informacion Personal/EliminarCuenta'
import CodigoVerifiacionEliminarCuenta from './modules/Configuracion/Informacion Personal/CodigoVerifiacionEliminarCuenta'
import CuentasRedes from './modules/Configuracion/Informacion Personal/CuentasRedes'
import Correo from './modules/Configuracion/Informacion Personal/Correo'
import Correo2 from './modules/Configuracion/Informacion Personal/Correo2'
import Telefono from './modules/Configuracion/Informacion Personal/Telefono'
import Telefono2 from './modules/Configuracion/Informacion Personal/Telefono2'
import Codigo from './modules/Configuracion/Informacion Personal/CodigoVerificacion'
import CodigoContrasena from './modules/Configuracion/Informacion Personal/CodigoContrasena'
import RecuperarContrasena from './modules/Configuracion/Informacion Personal/RecuperarContrasena'

const Jimmy = createStackNavigator({
  Registro:{
    screen : Registro,
    navigationOptions: {
      header:null
    }
  },
  CodigoVerificacion:{
    screen : CodigoVerificacion,
    navigationOptions: {
      headerTransparent:true
    }
  },
  CodigoVerificacionAPI:{
    screen : CodigoVerificacionAPI,
    navigationOptions: {
      headerTransparent:true
    }
  },
  InformacionPersonal:{
    screen : InformacionPersonal,
    navigationOptions: {
      headerTransparent:true
    }
  },
  InformacionAPI:{
    screen : InformacionAPI,
    navigationOptions: {
      headerTransparent:true
    }
  },
  ConfigurarContrasena:{
    screen : ConfigurarContrasena,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Legal:{
    screen : Legal,
    navigationOptions: {
      headerTitle:'Legal'
    }
  },
  Privacidad:{
    screen : Privacidad,
    navigationOptions: {
      headerTitle:'Aviso de Privacidad'
    }
  },
  TerminosyCondiciones:{
    screen : TerminosyCondiciones,
    navigationOptions: {
      headerTitle:'Términos y Condiciones'
    }
  },
  NavigationDrawer:{
    screen : NavigationDrawer,
    navigationOptions: {
      header:null
    }
  },
  Efectivo:{
    screen : Efectivo,
    navigationOptions: {
      headerTitle:'Pago en efectivo'
    }
  },
  Tarjeta:{
    screen : Tarjeta,
    navigationOptions: {
      headerTitle:'Agregar Tarjeta'
    }
  },
  InformacionPago:{
    screen : InformacionPago,
    navigationOptions: {
      headerTitle:'Información de Pago'
    }
  },
  ContactoConfianza:{
    screen : ContactoConfianza,
    navigationOptions: {
      headerTitle:'Contacto de Confianza'
    }
  },
  AgregarContacto:{
    screen : AgregarContacto,
    navigationOptions: {
      headerTitle:'Contactos'
    }
  },
  ListaContacto:{
    screen : ListaContacto,
    navigationOptions: {
      headerTitle:'Contactos de Confianza'
    }
  },
  Informacion:{
    screen : Informacion,
    navigationOptions: {
      headerTitle:'Información Personal'
    }
  },
  Camera:{
    screen : Camera,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor:'white'
    }
  },
  CargarFoto:{
    screen : CargarFoto,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Contrasena:{
    screen : Contrasena,
    navigationOptions: {
      headerTransparent:true
    }
  },
  EliminarCuenta:{
    screen : EliminarCuenta,
    navigationOptions: {
      headerTransparent:true
    }
  },
  CodigoVerifiacionEliminarCuenta:{
    screen : CodigoVerifiacionEliminarCuenta,
    navigationOptions: {
      headerTransparent:true
    }
  },
  CuentasRedes:{
    screen : CuentasRedes,
    navigationOptions: {
      headerTitle:'Cuentas en redes sociales'
    }
  },
  Correo:{
    screen : Correo,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Correo2:{
    screen : Correo2,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Telefono:{
    screen : Telefono,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Telefono2:{
    screen : Telefono2,
    navigationOptions: {
      headerTransparent:true
    }
  },
  Codigo:{
    screen : Codigo,
    navigationOptions: {
      headerTransparent:true
    }
  },
  CodigoContrasena:{
    screen : CodigoContrasena,
    navigationOptions: {
      headerTransparent:true
    }
  },
  RecuperarContrasena:{
    screen : RecuperarContrasena,
    navigationOptions: {
      headerTransparent:true
    }
  }
},{headerLayoutPreset : 'center'});

export default createAppContainer(Jimmy);
