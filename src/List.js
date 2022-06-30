import { StyleSheet, Text , FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

export default function Home({ markers, navigation }) {
//rendering the flatlist
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Map', { currentMarker: item })} style={styles.item}>
      <Text style={styles.title}>{item.title + '\n' + item.description}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={markers}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


