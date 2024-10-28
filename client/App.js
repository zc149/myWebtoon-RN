import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export default function App() {

  const genres = ["전체", "로맨스", "판타지", "액션", "일상", "스릴러", "개그", "무협", "드라마", "감성", "스포츠"]
  const [onUpdateModal, setOnUpdateModal] = useState(false);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [onAddModal, setOnAddModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [myWebtoonList, setmyWebtoonList] = useState(null);

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

      Axios.post('http://192.168.56.1:3000/api/user/create', { userId: userId })
        .then(res => {
          console.log(res.data);
          setmyWebtoonList(res.data);
        })
        .catch(error => console.log(error));

    }
    setUserId(userId);

  }

  const getMyWebtoonList = () => {

    if (!userId) return;

    Axios.post('http://192.168.56.1:3000/api/myPage/get/webtoon', { userId: userId })
      .then(res => {
        console.log(res.data);
        setmyWebtoonList(res.data);
      })
      .catch(error => console.log(error));

  }

  useEffect(() => {
    initializeUserId();
    getMyWebtoonList();
  }, [userId])

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>웹툰 기록</Text>
      <View style={styles.plusBtnContainer}>
        <Pressable onPress={() => setOnAddModal(true)}>
          <Image source={require("./assets/images/plusBtn.png")} style={styles.plusBtn} />
        </Pressable>
      </View>
      <View style={styles.menubarContainer}>
        <Text style={styles.menu}>에피소드</Text>
        <Text style={styles.menu}>최근본</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreContainer}>
        {genres.map((genre) => <Text style={styles.genre} key={genre}>{genre}</Text>)}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.webtoonList} showsVerticalScrollIndicator={false}>
        {myWebtoonList && myWebtoonList.length > 0 ? (
          myWebtoonList.map((webtoon) => (
            <Pressable
              style={styles.webtoonItem}
              key={webtoon.id}
              onPress={() => {
                setSelectedWebtoon(webtoon);
                setOnUpdateModal(true);
              }}
            >
              <Image source={{ uri: `http://192.168.56.1:3000/api/image/proxy?url=${encodeURIComponent(webtoon.image_url)}` }} style={styles.webtoonImage} />
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{webtoon.title}</Text>
                <Text>
                  {webtoon.genre ? webtoon.genre.slice(0, 10) : '장르 정보 없음'}
                </Text>
                <Text>총 {webtoon.episod_count}화, {webtoon.company}</Text>
                <Text>{webtoon.count}화까지 봄</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>웹툰 목록이 없습니다.</Text>
        )}
      </ScrollView>

      {onAddModal && <AddModal visible={onAddModal} setModal={setOnAddModal} />}

      {onUpdateModal && <UpdateModal webtoon={selectedWebtoon}
        visible={onUpdateModal} setModal={setOnUpdateModal} />}

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
  menu: {
    fontSize: 20,
    fontWeight: '600'
  },
  genreContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    height: 28
  },
  genre: {
    marginHorizontal: 12,
  },
  webtoonList: {
    marginTop: 10,
    width: '100%',
  },
  webtoonItem: {
    flexDirection: 'row',
    width: "90%",
    height: 120,
    marginVertical: 1,
  },
  webtoonImage: {
    width: "27%",
    height: 110,
    borderRadius: 15,
    borderWidth: 1,
    resizeMode: 'cover',
    margin: 4
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,

  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});