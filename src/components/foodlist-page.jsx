import * as React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from "react";


FONT_SIZE = 22;
export default function FoodListPage(props)
{
    const navigation = useNavigation();
    let foodIDs = props.route.params;
    const [foodList, setFoodList] = useState([]);

    axios.get('http://localhost:8081/api/food')
    .then(res =>
    {
        let fList = [];
        for (let data of res.data)
        {
            if (foodIDs.includes(data._id))
            {
                fList.push(<List.Item
                    key={data._id}
                    title={data.name}
                    titleStyle={{ fontSize: FONT_SIZE }}
                    left={props => <List.Icon {...props} icon={require('../../assets/food-icon.png')} />}
                    onPress={() => navigation.navigate('Food', data._id)}
                />);
            }
        }
        setFoodList(fList);
    })
    .catch(error => console.error(error));

    return (
        <View>{foodList}</View>
    );
}