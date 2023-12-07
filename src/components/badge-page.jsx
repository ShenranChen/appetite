import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useUser } from './global-user.jsx';
import { useState, useEffect } from 'react';


const BADGES =
[
    {
        'key': '5+review-likes',
        'image': require('../../assets/5-plus-review-likes.png'),
        'description': 'Your review got 5+ likes!'
    },
    {
        'key': 'first-time-review',
        'image': require('../../assets/first-time-review.png'),
        'description': 'You posted a review for the first time!'
    },
    {
        'key': '3-plus-reviews',
        'image': require('../../assets/3-plus-reviews.png'),
        'description': 'You\'ve posted more than 3 reviews!'
    }
];


function getBadge(badge)
{
    return (
    <View key={badge.key} style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={badge.image} style={{ marginBottom: 10, width: 150, height: 150 }} />
        <Text style={styles.badgeDescriptionFont}>
            {badge.description}
        </Text>
    </View>);
}

export default function BadgePage()
{
    const { user } = useUser();
    const [badgesElement, setBadgesElement] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () => {
            let badges = [];

            const userRes = await axios.get(`http://localhost:8081/api/users/${user}`);
            if (userRes.data.reviews.length >= 1)
                badges.push(getBadge(BADGES[1]));
            if (userRes.data.reviews.length >= 3)
                badges.push(getBadge(BADGES[2]));

            const reviewsData = await Promise.all(
                userRes.data.reviews.map((reviewID) =>
                axios.get(`http://localhost:8081/api/reviews/${reviewID}`)
                )
            );
        
            for (let review of reviewsData)
                if (review.data.likes >= 5)
                {
                    badges.push(getBadge(BADGES[0]));
                    break;
                }
                
            setBadgesElement(badges);
        };
        fetchData();
      }, [user]);

    return (
        <ScrollView>
            <Text style={styles.captionFont}>
                Badges
            </Text>
            <View style={{ margin: 20, alignItems: 'center' }}>
                {badgesElement}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create(
{
    captionFont: {
        fontSize: 45,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Noteworthy-Bold',
        backgroundColor: '#3CADDE',
        padding: 20
    },
    badgeDescriptionFont: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Noteworthy-Bold',
    }
});