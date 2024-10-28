import React, { useState } from 'react';
import Axios from 'axios';
import { Text, StyleSheet,View, Modal, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export default function UpdateModal({ visible, setModal,setSearchModal, webtoon, userId, action }) {
  const [count, setCount] = useState(''); 
  

  const handleAction = () => {
    const data = { userId: userId, webtoonId: webtoon.id, count: count };

    const url = action === 'update' 
      ? 'http://192.168.56.1:3000/api/myPage/update/webtoon' 
      : 'http://192.168.56.1:3000/api/myPage/save/webtoon';

    Axios.post(url, data)
      .then(res => {
        console.log(res.data);
        setModal(false); // 성공적으로 저장 후 모달 닫기
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
                    <Text style={styles.textTitle}>{webtoon.title}</Text>
                    <TextInput style={styles.input} placeholder='어디까지 보셨나요?'
                                value={count} onChangeText={setCount}
                    />
                    <TouchableHighlight
                      style={styles.modalUpdateBtn}
                      onPress={handleAction}
                    >
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
    margin: 12,
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
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
})