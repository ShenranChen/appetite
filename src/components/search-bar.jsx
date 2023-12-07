import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import axios from "axios"

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
     <Searchbar
      placeholder="feeling..."
      placeholderTextColor='grey'
      mode='view'
      style={{backgroundColor: 'transparent'}}
      iconColor='#3CADDE'
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    
    </View>
    
  );

}

export default Search;