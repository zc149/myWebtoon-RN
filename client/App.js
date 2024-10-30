import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import WebtoonList from './components/WebtoonList';
import DeleteModal from './components/DeleteModal';
import SearchModal from './components/SearchModal';
import SaveAndUpdateModal from './components/SaveAndUpdateModal';

export default function App() {

  const genreList = ["전체", "로맨스", "판타지", "액션", "일상", "스릴러", "개그", "무협", "드라마", "감성", "스포츠"]
  const [onUpdateModal, setOnUpdateModal] = useState(false);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [onSearchModal, setOnSearchModal] = useState(false);
  const [onDeleteModal, setOnDeleteModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [myWebtoonList, setmyWebtoonList] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('에피소드');


  // 중복검사 관련 로직 필요
  const generateRandomId = () => {
    return 'id-' + Math.random().toString(36).substring(2, 9);
  }

  const initializeUserId = async () => {
    let userId = await AsyncStorage.getItem('userId');

    console.log(userId);

    if (!userId) {
      userId = generateRandomId();
      await AsyncStorage.setItem('userId', userId);

      Axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/user/create', { userId: userId })
        .then(res => {
          setmyWebtoonList(res.data);
        })
        .catch(error => console.log(error));

    }

    setUserId(userId);

  }

  const getMyWebtoonList = () => {

    if (!userId) return;

    Axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/myPage/get/webtoon', { userId: userId })
      .then(res => {
        setmyWebtoonList(res.data);
      })
      .catch(error => console.log(error));

  }

  useEffect(() => {
    initializeUserId();
    getMyWebtoonList();
  }, [userId, onUpdateModal, onDeleteModal, onSearchModal])

  return (
    <View>
      <StatusBar style='dark' backgroundColor="#ffffff" />
      <View style={styles.pageContainer}>
        <Text style={styles.title}>웹툰 기록</Text>
        <View style={styles.plusBtnContainer}>
          <Pressable onPress={() => setOnSearchModal(true)}>
            <Image source={require("./assets/images/plusBtn.png")} style={styles.plusBtn} />
          </Pressable>
        </View>

        <View style={styles.menubarContainer}>
          <Pressable style={selectedSort === '에피소드' ? styles.selectedMenu : null} onPress={() => setSelectedSort('에피소드')}>
            <Text style={styles.menuText} >에피소드</Text>
          </Pressable>
          <Pressable style={selectedSort === '최근본' ? styles.selectedMenu : null} onPress={() => setSelectedSort('최근본')} >
            <Text style={styles.menuText}>최근본</Text>
          </Pressable>
        </View>


        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreContainer}>
          {genreList.map((genre) => (
            <Pressable style={selectedGenre === genre ? styles.selectedGenre : styles.genre}
              key={genre} onPress={() => setSelectedGenre(genre)}>
              <Text >{genre}</Text>
            </Pressable>))}
        </ScrollView>

        <WebtoonList myWebtoonList={myWebtoonList} setSelectedWebtoon={setSelectedWebtoon} selectedSort={selectedSort}
          setOnUpdateModal={setOnUpdateModal} setOnDeleteModal={setOnDeleteModal} genre={selectedGenre} />

        {onSearchModal && <SearchModal visible={onSearchModal} setModal={setOnSearchModal} userId={userId} />}

        {onDeleteModal && <DeleteModal visible={onDeleteModal} setModal={setOnDeleteModal}
          userId={userId} webtoon={selectedWebtoon} />}

        {onUpdateModal && <SaveAndUpdateModal webtoon={selectedWebtoon} action={'update'}
          visible={onUpdateModal} setModal={setOnUpdateModal} userId={userId} />}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  plusBtnContainer: {
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 1,
  },
  plusBtn: {
    width: 20,
    height: 20
  },
  menubarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 55,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectedMenu: {
    borderBottomWidth: 2,
    borderBottomColor: '#6B6868', // 선택된 항목의 밑줄 색상
  },
  genreContainer: {
    flexDirection: 'row',
    marginTop: 7,
    width: '90%',
    height: 28
  },
  genre: {
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 1,
    justifyContent: 'center'

  },
  selectedGenre: {
    marginHorizontal: 8,
    backgroundColor: '#DBD9D9',
    borderRadius: 15,
    padding: 1,
    justifyContent: 'center'
  },
});