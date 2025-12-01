import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function DrawerLateral({ navigation, currentRoute }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', route: 'HomeScreen' },
    { label: 'Transacciones', route: 'TransaccionesScreen' },
    { label: 'Gráficas', route: 'GraficosScreen' },
    { label: 'Presupuestos', route: 'PresupuestoScreen' },
    { label: 'Pagos', route: 'PagosScreen' },
    { label: 'Crear Transacción', route: 'RegistroIngresosScreen' },
    { label: 'Crear Presupuesto', route: 'AgregarPresupuestoScreen' },
    { label: 'Crear Pago', route: 'Crearpagos' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

      {/* BOTON  */}
      <TouchableOpacity
        style={styles.botonContainer}
        onPress={toggleSidebar}
      >
        <Text style={styles.menuBoton}>☰</Text>
      </TouchableOpacity>


      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}






      {isOpen && (
        <View style={styles.barraContainer}>
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/usuario.png')}
              style={styles.imagenUsuario}
            />
            <Text style={styles.usuarioText}>Ahorra Plus</Text>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.menuItem,
                  currentRoute === item.route && styles.menuItemActivo
                ]}
                onPress={() => {
                  navigation.navigate(item.route);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    currentRoute === item.route && styles.menuTextActivo
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  botonContainer: {
    position: 'absolute',
    top: 25,
    left: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
    borderRadius: 25,
    /* backgroundColor: '#0a172c', */
    elevation: 4,
  },
  menuBoton: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  barraContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#000e26',
    paddingTop: 50,
    paddingHorizontal: 15,
    zIndex: 1000,
    elevation: 9,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    marginTop: 20,
    paddingLeft: 5,
  },
  imagenUsuario: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginRight: 10,
  },
  usuarioText: {
    color: 'white',
    fontSize: 16,
  },
  menuItem: {
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  menuItemActivo: {
    backgroundColor: '#4c74a6',
  },
  menuText: {
    color: 'white',
    fontSize: 15,
  },
  menuTextActivo: {
    color: '#e2e8f0',
  },
});