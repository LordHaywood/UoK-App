import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {connect} from "react-redux";
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {updateNote, saveNote} from '../actions';
import {Button, Input} from '../components';
import {THEME_COLOR} from "../lib/Constants";

class Session extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (<Entypo name="video" size={32} color={tintColor}/>)
  };

  render() {

    const { backgroundStyle, noteStyle } = styles;

    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }

    return (
        <View style={backgroundStyle}>
          <Text
              style={{
                fontWeight: '600',
                fontSize: 30,
                alignSelf: 'center',
                color: '#fff',
                paddingTop: 10
              }}
          >
            {'KentFlix'}
          </Text>
          <ScrollView>
            <Input
              placeholder='Enter a note...'
              style={noteStyle}
              numberOfLines={5}
              multiline={true}
              value={note}
              onChangeText={(note) => this.props.noteUpdate(note)}
            />
            <Button
                title={loading ? '' : 'Submit Session'}
                style={{
                  height: 60,
                  margin: 10,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                textStyle={{
                  fontSize: 20,
                  color: THEME_COLOR
                }}
                buttonStyle={{
                  backgroundColor: '#fff'
                }}
                disabled={loading}
                loadingColor={THEME_COLOR}
                onPress={() => this.props.saveNote(note)}
                loading={loading}
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    ...Platform.select({
      ios:{
        paddingTop: 10
      }
    })
  },
  headerTextStyle: {
    alignSelf: 'center',
    width: 222,
    height: 125,
    marginTop: 10
  },
  noteStyle: {
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {
  noteUpdate: updateNote,
  saveNote: saveNote
})(Session);
