import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, StyleSheet, Animated, Easing } from 'react-native'
// import Animated, { Easing }from 'react-native-reanimated'

const { height, width } = Dimensions.get('window')

const projects = [
    { title: 'metoo', 
    description: "",
    image: "https://metoo-assets.s3.amazonaws.com/static/media/stock_avatar.jpg" }
]

const projectsMap = {}
projects.map(project => {
    projectsMap[project.title] = project
})
const DETAILS_HEIGHT = 200

export default class Projects extends Component {
    constructor(props) {gjhfthd
        super(props)
        this.state = { expanded: '', expandedItem: {} }
        this.detailsHeight = new Animated.Value(0)
        this.detailsOpacity = this.detailsHeight.interpolate({ inputRange: [0, DETAILS_HEIGHT], outputRange: [0, 1]})
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', }} >
                <Text>
                    Projects
                </Text>
                <this.projects />
                <this.expandedDetails />
            </View>
        )
    }

    projects = () => {
        return (
            <FlatList
                data={projects}
                // style={{ flex: 1 }}
                renderItem={this.renderProject}
                keyExtractor={(item) => item.title}
                extraData={this.state}
                horizontal={true}
            />
        )
    }
    renderProject = ({ item }) => {
        const { expanded } = this.state
        return <Project project={item} toggleExpand={this.toggleExpand} expanded={expanded == item.title} />
    }
    expandedDetails = () => {
        const { expandedItem } = this.state
        // return null
        return (
            <Animated.View style={{ height: this.detailsHeight, flexDirection: 'column',  opacity: this.detailsOpacity}} >
                <Text>
                    {expandedItem.title}
                </Text>
                <Text>
                    {expandedItem.description}
                </Text>
            </Animated.View>
        )
    }
    toggleExpand = ({ title, expanded }) => {
        const animate = (callback) => Animated.timing(this.detailsHeight, { toValue: expanded ? DETAILS_HEIGHT : 0, duration: 1500, easing: Easing.elastic(1) }).start(() => callback?.())
        const setState = (callback) => this.setState({ expanded: expanded ? title : '', expandedItem: expanded ? projectsMap[title] : {} }, callback)
        expanded ? setState(animate) : animate(setState)
    }
}
class Project extends Component {
    render() {
        const { project } = this.props
        return (
            <TouchableOpacity style={styles.projectContainer} onPress={this.toggleExpand} >
                <Image source={{ uri: project.image }} style={{ height: 100, width:  300 }} />
            </TouchableOpacity>
        )
    }
    toggleExpand = () => {
        const { toggleExpand, project, expanded } = this.props
        toggleExpand({ title: project.title, expanded: !expanded })
    }
}

const styles = StyleSheet.create({
    projectContainer: {
        // width: 300,
        // height: 150
    }
})