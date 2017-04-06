import React, {PropTypes, Component} from "react";
import {StyleSheet, TouchableOpacity, Image, Text, View, BackAndroid} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class CounterView extends Component {
    static displayName = 'CounterView';


    constructor(props) {
        super(props);

        const username = "admin";
        const password = "admin";

        this.state = {
            authToken: '',
            userId: '',
            userName: ''
        };

        fetch('http://192.168.0.22:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({authToken: responseJson.data.authToken});
                this.setState({userId: responseJson.data.userId});

                if (!this.state.authToken || !this.state.userId) {
                    console.log("####################### LOGIN ERROR : !this.state.authToken '" + !this.state.authToken
                        + "' || !this.state.userId = '" + !this.state.userId + "'");
                    BackAndroid.exitApp();
                }
                fetch(`http://192.168.0.22:3000/api/v1/me`, {
                    "method": "GET",
                    "headers": {
                        "x-auth-token": this.state.authToken,
                        "x-user-id": this.state.userId
                    }
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("####################### ME userName : " + responseJson.username);
                        console.log("####################### ME status : " + responseJson.status);
                        this.setState({userName: responseJson.name});
                        if (!this.state.userName) {
                            console.log("####################### ME ERROR");
                            BackAndroid.exitApp();
                        }
                    })
                    .catch((error) => {
                        console.log("####################### api/v1/me error");
                        console.error(error);
                        console.log("####################### api/v1/me error");
                    });
                fetch(`http://192.168.0.22:3000/api/v1/groups.list`, {
                    "method": "GET",
                    "headers": {
                        "x-auth-token": this.state.authToken,
                        "x-user-id": this.state.userId
                    }
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("####################### channels.list.joined JSON.stringify : " + JSON.stringify(responseJson));
                    })
                    .catch((error) => {
                        console.log("####################### api/v1/channels.list.joined error");
                        console.error(error);
                        console.log("####################### api/v1/channels.list.joined error");
                    });
                fetch(`http://192.168.0.22:3000/api/v1/chat.postMessage`, {
                    "method": "POST",
                    "headers": {
                        "x-auth-token": this.state.authToken,
                        "x-user-id": this.state.userId,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        channel: "channel1",
                        text: "This is a test!"
                    })
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("####################### channels.list.joined JSON.stringify : " + JSON.stringify(responseJson));
                    })
                    .catch((error) => {
                        console.log("####################### api/v1/channels.list.joined error");
                        console.error(error);
                        console.log("####################### api/v1/channels.list.joined error");
                    });
            })
            .catch((error) => {
                console.log("####################### api/v1/login error");
                console.error(error);
                console.log("####################### api/v1/login error");
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

                <Text style={styles.red}>{"--" + this.state.userName + "--"}</Text>
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
