import React, { useState } from 'react';
import Axios from 'axios';
import { Text, StyleSheet, View, Modal, ScrollView, TextInput, TouchableHighlight, TouchableWithoutFeedback, Pressable, Image } from 'react-native';
import SaveAndUpdateModal from './SaveAndUpdateModal';
import RegistModal from './RegistModal';

export default function SearchModal({ visible, setModal, userId }) {
  const [title, setTitle] = useState('');
  const [onAddModal, setOnAddModal] = useState(false);
  const [onRegistModal, setOnRegistModal] = useState(false);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [searchedWebtoon, setSearchedWebtoon] = useState([]);

  const searchWebtoon = () => {
    Axios.post('http://192.168.56.1:3000/api/myPage/search/webtoon', { title: title })
      .then(res => {
        setSearchedWebtoon(res.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => setModal(false)}>
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.searchContainer}>
              <TextInput 
              style={styles.input} 
              placeholder='제목'
              value={title} 
              onChangeText={setTitle}
            />
            <TouchableHighlight
              style={styles.modalSearchBtn}
              onPress={searchWebtoon}
            >
              <Text style={{ textAlign: "center" }}>검색</Text>
            </TouchableHighlight>
            </View>
            

            <ScrollView contentContainerStyle={styles.webtoonList}>
              {searchedWebtoon && searchedWebtoon.length > 0 ? (
                searchedWebtoon.map((webtoon) => (
                  <Pressable
                    style={styles.webtoonItem}
                    key={webtoon.id}
                    onPress={() => {
                      setSelectedWebtoon(webtoon);
                      setOnAddModal(true);
                    }}
                  >
                    <Image source={{ uri: `http://192.168.56.1:3000/api/image/proxy?url=${encodeURIComponent(webtoon.image_url)}` }} style={styles.webtoonImage} />
                    <View style={styles.textContainer}>
                      <Text style={styles.textTitle}>{webtoon.title}</Text>
                      <Text>
                        {webtoon.genre ? webtoon.genre.slice(0, 10) : '장르 정보 없음'}
                      </Text>
                      <Text>총 {webtoon.episod_count}화, {webtoon.company}</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                  <View>
                    <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
                    <Pressable onPress={() => setOnRegistModal(true)}>
                      <Text style={styles.registText}>직접 등록하기</Text>
                    </Pressable>
                    
                    {onRegistModal && <RegistModal visible={onRegistModal} setModal={setOnRegistModal}
                      setSearchModal={setModal} userId={userId} />}


                  </View>
                  
                  
              )}

              {onAddModal && <SaveAndUpdateModal webtoon={selectedWebtoon} action={'add'}
                visible={onAddModal} setModal={setOnAddModal} userId={userId} setSearchModal={setModal} />}


            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>


      
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "rgba(217, 217, 217, 0.6)"
  },
  modalBox: {
    flexDirection: 'column',
    width: "80%",
    maxHeight: "80%",
    marginTop: 100,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  searchContainer: {
    flexDirection:'row'
  },
  input: {
    height: 40,
    width: '82%',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  modalSearchBtn: {
    borderWidth: 1,
    width: 50,
    height: 35,
    marginTop: 2,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, 
  },
  webtoonList: {
    width: '100%',
    paddingVertical: 10,
  },
  webtoonItem: {
    flexDirection: 'row',
    width: "100%",
    height: 120,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  webtoonImage: {
    width: "27%",
    height: 110,
    borderRadius: 15,
    borderWidth: 1,
    margin: 5,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 15,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  registText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#0217FF',
  },
});
