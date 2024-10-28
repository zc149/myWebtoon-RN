import React, { useState } from 'react';
import Axios from 'axios';
import { Text, StyleSheet,View, Modal, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export default function DeleteModal({ visible, setModal, webtoon, userId }) {
  
  const updateCount = () => {
      setModal(false);
      
      const data = { userId: userId, webtoonId: webtoon.id };

    Axios.post('http://192.168.56.1:3000/api/myPage/delete/webtoon', data)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));

  }


    return (
        <Modal visible={visible} animationType='fade' transparent={true}
              onRequestClose={() => setModal(false)}>
              <TouchableWithoutFeedback onPress={() => setModal(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalBox}>
                    <Text>정말 삭제할까요?</Text>
                        
                    <View style={styles.modalBtnContainer}> 
                        <TouchableHighlight
                        style={styles.modalDeleteBtn}
                        onPress={updateCount}
                        >
                        <Text style={{ textAlign: "center" }}>확인</Text>
                        </TouchableHighlight>
                            
                        <TouchableHighlight
                        style={styles.modalDeleteBtn}
                        onPress={() => setModal(false)}
                        >
                        <Text style={{ textAlign: "center" }}>취소</Text>
                        </TouchableHighlight>
                    </View>
                        
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
    width: "40%",
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    },
    modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalDeleteBtn: {
    borderWidth: 1,
    width: 50,
    height: 30,
    marginTop: 20,
    marginHorizontal:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, 
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
})