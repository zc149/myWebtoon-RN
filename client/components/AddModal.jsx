import React from 'react';
import { Text, StyleSheet,View, Modal, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export default function name({ visible, setModal }) {
    
    return (
        <Modal visible={visible} animationType='fade' transparent={true}
              onRequestClose={() => setModal(false)}>
              <TouchableWithoutFeedback onPress={() => setModal(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalBox}>
                    <TextInput style={styles.input} placeholder='제목' />
                    <TextInput style={styles.input} placeholder='어디까지 보셨나요?' />
                    <TouchableHighlight
                      style={styles.modalUpdateBtn}
                      onPress={() => setModal(false)}
                    >
                      <Text style={{ textAlign: "center" }}>추가</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(217, 217, 217, 0.6)"
  },
  modalBox: {
    width: "50%",
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    width: 170,
    margin: 2,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  modalUpdateBtn: {
    borderWidth: 1,
    width: 50,
    height: 30,
    marginTop:5
  }
})