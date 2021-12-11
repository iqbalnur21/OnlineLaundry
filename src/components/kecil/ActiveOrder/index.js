import React from 'react'
import {
  StyleSheet, Text, TouchableOpacity, View, Dimensions,
} from 'react-native';
import {Input
  , Distance
  , Button
} from '../../kecil';
import { IconActiveOrder } from '../../../assets'
import { colors } from '../../../utils';
import { ModalPopUp } from "../../../components";

const ActiveOrder = ({ title, status }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View>
      <ModalPopUp visible={visible}>
        <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Order Details</Text>
      <Distance height={10} />
        </View>
        <View style={{ fontSize: 18 }}>
        <Text >{title}</Text>
        <Text >Order Date : 26 June 2021</Text>
        <Text >Amount : 1KG</Text>
        <Text >Price : Rp. 12,000</Text>
        <Text >Courier : JNT</Text>
        <Text style={styles.status(status)}>{status}</Text>
        </View>
      <Distance height={25} />
        <Button title="Confirm" type="text" padding={12} fontSize={18}onPress={() => setVisible(false)} />
      </ModalPopUp>
      <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
        <IconActiveOrder />
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.status(status)}>{status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ActiveOrder

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    
  },
  Animation: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  information: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight * 0.01,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  ok: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight * 0.01,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: windowHeight * 0.01,
    alignItems: 'center'
  },
  text: {
    marginLeft: windowHeight * 0.02,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold'
  },
  status: (status) => ({
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
    color: status === "Finish" ? colors.finish : status === "Washing" ? colors.washing : colors.grey
  })
})
