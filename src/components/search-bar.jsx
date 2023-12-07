import * as React from 'react';
import { View, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from "axios"

const Search = ({navigation}) => {
    const [foodData, setFoodData] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        // Fetch data from your database or API
        fetchFoodFromDatabase();
      }, []);

      const fetchFoodFromDatabase = async () => {
            axios.get("http://localhost:8081/api/food")
            .then(response => {
                const sortedFoods = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setFoodData(sortedFoods)})
            .catch(error => console.error("Couldn't fetch food \n" + error));

            console.log(foodData);
      };


  const onChangeSearch = query => setSearchQuery(query);
  const filteredFoods = foodData.filter(
    (foodData) =>
    foodData.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFood = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Food', item._id )}>
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>{item.name}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
     <Searchbar
      placeholder="feeling..."
      placeholderTextColor='grey'
      mode='view'
      style={{backgroundColor: 'transparent'}}
      iconColor='#3CADDE'
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    <FlatList 
          data={filteredFoods}
          renderItem={renderFood} 
          keyExtractor={(item) => item._id} 
    /> 

    </SafeAreaView>
    
  );

}

export default Search;