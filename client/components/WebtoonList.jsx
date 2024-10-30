import React, { useEffect } from 'react';
import { Text, StyleSheet,View, ScrollView, Pressable, Image } from 'react-native';


export default function WebtoonList({myWebtoonList, setSelectedWebtoon, setOnUpdateModal, setOnDeleteModal, genre, selectedSort}) {
    
  useEffect(() => {

  }, [myWebtoonList, genre]);

    return (
        <ScrollView contentContainerStyle={styles.webtoonList} showsVerticalScrollIndicator={false}>
        {myWebtoonList && myWebtoonList.length > 0 ? (
          myWebtoonList.filter((webtoon) => genre === '전체' || webtoon.genre.includes(genre))
            .sort((a, b) => {
              if (selectedSort === '최근본') {
                    return new Date(b.updateDate) - new Date(a.updateDate);
                }
                return 0;
            }).map((webtoon) => (
            <Pressable
              style={styles.webtoonItem}
              key={webtoon.id}
              onPress={() => {
                setSelectedWebtoon(webtoon);
                setOnUpdateModal(true);
              }}
            >
              <Image source={webtoon.image_url ? { uri: process.env.EXPO_PUBLIC_API_URL + `/api/image/proxy?url=${encodeURIComponent(webtoon.image_url)}` } : require('../assets/images/lg_i15916647317548_noname.jpg')} style={styles.webtoonImage} />
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{webtoon.title}</Text>
                <Text>
                  {webtoon.genre ? webtoon.genre.split(',').slice(0, 3).join(',') : '장르 정보 없음'}
                </Text>
                <Text> {webtoon.episod_count ? '총 ' + webtoon.episod_count + '화 ,' : '정보없음'} {webtoon.company}</Text>
                <Text>{webtoon.count}화까지 봄</Text>
              </View>

              <Pressable onPress={() => {
                setSelectedWebtoon(webtoon);
                setOnDeleteModal(true)
              }}>
                <Image style={styles.deleteBtn} source={require("../assets/images/deleteBtn.png")}/>
              </Pressable>

            </Pressable>
          ))
        ) : (
          <Text>웹툰 목록이 없습니다.</Text>
        )}
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    webtoonList: {
    marginTop: 10,
    width: '100%',
  },
  webtoonItem: {
    flexDirection: 'row',
    width: "90%",
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
    fontWeight: 'bold'
  },
  deleteBtn: {
    width: 20,
    height: 20,
    margin:10
  },
});