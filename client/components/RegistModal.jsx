import React, { useState } from 'react';
import Axios from 'axios';
import { Text, StyleSheet,View, Modal, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export default function RegistModal({ visible, setModal, setSearchModal, userId }) {
    const [title, setTitle] = useState('');  
    const [count, setCount] = useState(); 
  

    const handleAction = () => {
        const data = { userId: userId, title: title, count: count };

        const isValidInteger = /^\d+$/.test(count.trim());

        if (!isValidInteger) {
        return;
        }
    
        Axios.post( process.env.EXPO_PUBLIC_API_URL + '/api/myPage/temp/webtoon', data)
        .then(res => {
            setModal(false);
            setSearchModal(false);
        })
        .catch(error => console.log(error));
  };

    return (
        <Modal visible={visible} animationType='fade' transparent={true}
              onRequestClose={() => setModal(false)}>
              <TouchableWithoutFeedback onPress={() => setModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        
                    <TextInput style={styles.input} placeholder='제목을 정확히 입력해주세요'
                                    value={title} onChangeText={setTitle}/>
                    <TextInput style={styles.input} placeholder='어디까지 보셨나요?'
                            value={count} onChangeText={setCount} />
                        
                    <TouchableHighlight
                      style={styles.modalUpdateBtn}
                      onPress={handleAction}>
                      <Text style={{ textAlign: "center" }}>확인</Text>
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
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  modalUpdateBtn: {
    borderWidth: 1,
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
})