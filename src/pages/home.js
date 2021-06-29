import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
// import { SafeAreaView } from 'react-navigation' 
import Projects from './projects'

const { height, width } = Dimensions.get('window')

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {  }
    }

    render(){
        return (
            <View>
                <Projects />
            </View> 
        )
    }
    

}