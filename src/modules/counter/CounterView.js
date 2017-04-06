import React, {PropTypes, Component} from "react";
import {StyleSheet, TouchableOpacity, Image, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class CounterView extends Component {
    static displayName = 'CounterView';


    constructor(props) {
        super(props);
        this.state = {
            rcInfo: ''
        };

        //fetch('https://demo.rocket.chat/api/v1/info')
        fetch('http://192.168.0.26:3000/api/v1/info')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({rcInfo: responseJson.success});
            })
            .catch((error) => {
                console.log("####################### error");
                console.error(error);
                console.log("####################### error");
            });
    }

    static navigationOptions = {
        title: 'Counter',
        tabBar: () => ({
            icon: (props) => (
                <Icon name='plus-one' size={24} color={props.tintColor}/>
            )
        })
    }

    static propTypes = {
        counter: PropTypes.number.isRequired,
        userName: PropTypes.string,
        userProfilePhoto: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        counterStateActions: PropTypes.shape({
            increment: PropTypes.func.isRequired,
            reset: PropTypes.func.isRequired,
            random: PropTypes.func.isRequired
        }).isRequired,
        navigate: PropTypes.func.isRequired
    };

    increment = () => {
        this.props.counterStateActions.increment();
    };

    reset = () => {
        this.props.counterStateActions.reset();
    };

    random = () => {
        this.props.counterStateActions.random();
    };

    bored = () => {
        this.props.navigate({routeName: 'Color'});
    };

    renderUserInfo = () => {
        if (!this.props.userName) {
            return null;
        }

        return (
            <View style={styles.userContainer}>
                <Image
                    style={styles.userProfilePhoto}
                    source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
                />
                <Text style={styles.linkButton}>
                    Welcome, {this.props.userName}!
                </Text>
            </View>
        );
    };

    render() {
        const loadingStyle = this.props.loading
            ? {backgroundColor: '#eee'}
            : null;

        return (
            <View style={styles.container}>

                {this.renderUserInfo()}

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={'Increment counter'}
                    onPress={this.increment}
                    style={[styles.counterButton, loadingStyle]}>
                    <Text style={styles.counter}>
                        {this.props.counter}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={'Reset counter'}
                    onPress={this.reset}>
                    <Text style={styles.linkButton}>
                        Reset
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={'Randomize counter'}
                    onPress={this.random}>
                    <Text style={styles.linkButton}>
                        Random
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.bored} accessible={true}>
                    <Text style={styles.linkButton}>
                        {'I\'m bored!'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.red}>{"--" + this.state.rcInfo + "--"}</Text>
            </View>
        );
    }
}

const circle = {
    borderWidth: 0,
    borderRadius: 40,
    width: 80,
    height: 80
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    userContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    userProfilePhoto: {
        ...circle,
        alignSelf: 'center'
    },
    counterButton: {
        ...circle,
        backgroundColor: '#349d4a',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    counter: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    welcome: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 5,
        padding: 5
    },
    linkButton: {
        textAlign: 'center',
        color: '#CCCCCC',
        marginBottom: 10,
        padding: 5
    },
    red: {
        textAlign: 'center',
        color: '#FF0000',
        marginBottom: 10,
        padding: 5
    }
});

export default CounterView;
