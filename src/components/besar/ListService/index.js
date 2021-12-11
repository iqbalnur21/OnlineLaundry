import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
// import {CardService} from '../../kecil';
import {ButtonIcon1} from '../../kecil';

const ListService = ({
  getListServiceLoading,
  getListServiceResult,
  getListServiceError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getListServiceResult ? (
        Object.keys(getListServiceResult).map((key) => {
          return (
            <ButtonIcon1
              key={key}
              Service={getListServiceResult[key]}
              navigation={navigation}
            />
          );
        })
      ) : getListServiceLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListServiceError ? (
        <Text>{getListServiceError}</Text>
      ) : (
        <Text>Empty Data</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  getListServiceLoading: state.ServiceReducer.getListServiceLoading,
  getListServiceResult: state.ServiceReducer.getListServiceResult,
  getListServiceError: state.ServiceReducer.getListServiceError,
});

export default connect(mapStateToProps, null)(ListService);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});
