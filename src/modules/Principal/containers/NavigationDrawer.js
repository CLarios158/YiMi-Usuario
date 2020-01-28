import React  from 'react'
import { Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Principal from './Principal'
import Pago from '../../Pago/Pago'
import CentroSeguridad from '../../CentroSeguridad/CentroSeguridad'
import Configuracion from '../../Configuracion/Configuracion'
import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent: ({ navigation }) =>{
        return (<MenuDrawer navigation={navigation}/>)
    }

}

const DrawerNavigator = createDrawerNavigator({
    Inicio:{
        screen: Principal,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='home' size={20} />
        }   
    }
    ,Pago:{
        screen: Pago,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='credit-card' size={20}/>
        }
    },
    "Mis viajes":{
        screen: Pago,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='suitcase' size={20}/>
        }
    },
    "Datos de Facturación":{
        screen: Pago,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='file-alt' size={20}/>
        }
    },
    "Ayuda":{
        screen: Pago,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='question-circle' size={20}/>
        }
    },
    "Centro de Seguridad": {
        screen: CentroSeguridad,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='lock' size={20}/>
        }
    },
    "Configuración": {
        screen: Configuracion,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='cog' size={20}/>
        }
    },
    "Mis Cupones": {
        screen: CentroSeguridad,
        navigationOptions:{
            drawerIcon: <FontAwesome5 name='ticket-alt' size={20}/>
        }
    }     
}, DrawerConfig);


export default createAppContainer(DrawerNavigator)