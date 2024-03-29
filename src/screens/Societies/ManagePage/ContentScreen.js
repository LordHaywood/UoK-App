import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, ListView, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import SliderEntry from '../../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../../styles/SliderEntry.style';
import {connect} from "react-redux";
import {THEME_COLOR} from "../../../lib/Constants";
import { Entypo } from '@expo/vector-icons';
import {Button, Input} from '../../../components';

import styles from "../../../styles/main.style";

import { getSociety, updateSocietyPage } from "../../../DataRequests/Societies";

class SocietiesHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    
    this.state = {
      selected: 0,
      refreshing: true,
      societyID: navigation.getParam('societyID', ''),
      society: navigation.getParam('society', {}),
      page: [],
      visible: false,
      editTitleVisible: false,
      update: false
    };
    this.getSociety = this.getSociety.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.addText = this.addText.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.changeSelectedContent = this.changeSelectedContent.bind(this);
    
    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.getSociety();
      }
    );
  }
                                  
  componentDidMount() {
    this.getSociety();
  }

  getSociety() {
    getSociety(this.state.societyID)
      .then(society => {
        if (!society.page)
          society.page = [];
        this.setState({
          society: society,
          page: society.page,
          refreshing: false
        });
      })
      .catch((e) => {
        this.setState({
          refreshing: false
        });
      });
  }
  
  showModal = () => this.setState({visible: true})

  hideModal = () => this.setState({visible: false})

  showEditTitleModal = () => this.setState({editTitleVisible: true})

  hideEditTitleModal = () => {
    this.setState({editTitleVisible: false});
    updateSocietyPage(this.state.societyID, this.state.page);
  }

  renderItem = ({ item, index }) => {
    if (this.state.page[index].type == "title") {
       return (
          <TouchableOpacity
            style={{ 
              minHeight: 1
            }}
            onPress={() => {this.setSelected(index)}}
          >
            <Text style={[styles.title]}>{this.state.page[index].content}</Text>
          </TouchableOpacity>
        );
    } else if (this.state.page[index].type == "text") {
       return (
          <TouchableOpacity
            style={{ 
              minHeight: 1
            }}
          >
            <Text style={[styles.text]}>{this.state.page[index].content}</Text>
          </TouchableOpacity>
        );
    }
  }

  addTitle() {
    let page = this.state.page;
    page.push({
      key: page.length,
      type: "title",
      content: "Default Title"
    })
    this.setState({
      page: page
    });
    this.hideModal();
  }

  addText() {
    let page = this.state.page;
    page.push({
      key: page.length,
      type: "text",
      content: "Default Text"
    })
    this.setState({
      page: page
    });
    this.hideModal();
  }

  setSelected(id) {
    this.setState({
      selected: id
    })
    this.showEditTitleModal();
  }

  changeSelectedContent(text) {
    let data = this.state.page;
    data[this.state.selected].content = text;
    this.setState({ page: data, update: true });
  }

  render() {
    const {
      loading,
      error,
      note
    } = this.props;

    if (error) {
      alert(error);
    }
    
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.background}>
          <Modal
            style={styles.modal}
            transparent={true}
            isVisible={this.state.editTitleVisible}
            onBackdropPress={this.hideEditTitleModal}
          >
            <Text style={[styles.title, styles.textCenter, {marginBottom: 10}]}>{"Edit Title"}</Text>
            <Input
                  placeholder='Enter New Title'
                  style={styles.input}
                  value={(this.state.page[this.state.selected] && this.state.page[this.state.selected].content) ? this.state.page[this.state.selected].content : ""}
                  onChangeText={(text) => {this.changeSelectedContent(text)}}
              />
          </Modal>
          <TouchableOpacity
            onPress={this.showModal}
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 15,
              right: 15,
              width: 50,
              height: 50,
              borderRadius: 50
            }}>
              <View style={{
                flex:1,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                paddingTop: 2,
                width: 50,
                height: 50,
                backgroundColor: THEME_COLOR,
                borderRadius: 50
              }}>
              <Entypo name="plus" size={23} color={"white"} />
            </View>
          </TouchableOpacity>

          <Modal
            style={styles.bottomModal}
            isVisible={this.state.visible}
            onBackdropPress={this.hideModal}
          >
            <View style={{flex: 0, height: 6}}>
              <View style={{height: 6, borderRadius: 3, width: 60, backgroundColor: '#999', alignSelf: 'center'}} />
            </View>
            <Text style={[styles.title, styles.textCenter, {marginTop: 15}]}>{"Select element you want to add"}</Text>
            <ScrollView 
              horizontal={true}
            >
               {/* place your buttons here */}
              <TouchableOpacity
                onPress={this.addTitle}
                style={{
                  alignSelf: 'center',
                }}>
                <View style={{
                  borderRadius: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                  height: 48,
                  alignSelf: 'center',
                  marginRight: 9
                }}>
                  <Text style={styles.text}>{"Title"}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.addText}
                style={{
                  alignSelf: 'center',
                }}>
                <View style={{
                  borderRadius: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 25,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                  height: 48,
                  alignSelf: 'center',
                  marginRight: 9
                }}>
                  <Text style={styles.text}>{"Text"}</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </Modal>

          <View style={styles.popup}>
            <View style={[styles.container, {flex: 1}]}>
              <FlatList
                shouldComponentUpdate={this.state.update}
                data={this.state.page}
                extraData={this.state.page}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                scrollPercent={5}
                onMoveEnd={({ data }) => {
                  this.setState({ page: data })
                }}
              />
            </View>
          </View>
        </View >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Session.loading,
    error: state.Session.error,
    note: state.Session.note
  };
};

export default SessionScreen = connect(mapStateToProps, {})(SocietiesHomeScreen);