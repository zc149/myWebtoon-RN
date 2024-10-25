import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';

export default function App() {

  const genres = ["전체", "로맨스", "판타지", "액션", "일상", "스릴러", "개그", "무협", "드라마", "감성", "스포츠"]
  const dummy = [
    {
      webtoonId: 1,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 2,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 3,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 4,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 5,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 6,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 7,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
    {
      webtoonId: 8,
      webtoonTitle: "민간인 통제구역 - 일급기밀",
      weebtoonGenre: "스릴러, 고자극스릴러, 자극적인, 시리어스, 사회고발, 프리퀄, 밀리터리, 하이퍼리얼리즘, 서스펜스",
      totalEpisod: 83,
      imageUrl: "https://image-comic.pstatic.net/webtoon/801324/thumbnail/thumbnail_IMAG21_201ca646-5c79-42d2-ad28-49a435dc362e.jpg",
      complete: 0,
      company: "naver",
      connectUrl: "https://comic.naver.com/webtoon/list?titleId=801324"
    },
  ]

  const [onUpdateModal, setOnUpdateModal] = useState(false);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [onAddModal, setOnAddModal] = useState(false);

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
        {dummy.map((webtoon) =>
          <Pressable style={styles.webtoonItem} key={webtoon.webtoonId} onPress={() => {
            setSelectedWebtoon(webtoon);
            setOnUpdateModal(true);
          }}>
            <Image source={require("./assets/images/image1.png")} style={styles.webtoonImage} />
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{webtoon.webtoonTitle}</Text>
              <Text>{webtoon.weebtoonGenre.slice(0, 10)}</Text>
              <Text>총 {webtoon.totalEpisod}화, {webtoon.company}</Text>
              <Text>10화까지 봄</Text>
            </View>
          </Pressable>
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