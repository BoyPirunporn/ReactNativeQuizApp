import React from 'react';
import * as svg from 'react-native-svg';
import { View } from 'react-native';
import FaceSkin from '../../../assets/child-light-skin-tone.svg'
import Crown from '../../../assets/crown.svg';
const PlaceNd = (
    {
        show,
        Svg
    }:
        {
            show: boolean,
            Svg: string
        }
) => {
    return (
        <View>
            <svg.Svg width={show ? 60 : 80} height={show ? 60 : 80} style={{
                position: "relative"
            }}>
                <FaceSkin />
            </svg.Svg>
            <svg.Svg width={80} height={70} style={{
                position: "absolute",
                left: 25,
                top: -10,
                display: show ? "none" : "flex"
            }}>
                <Crown />
            </svg.Svg>
            <svg.Svg width={80} height={70} style={{
                position: "absolute",
                left: 25,
                top: 100,
                display: show ? "none" : "flex"
            }}>
                <Svg />
            </svg.Svg>
        </View>
    )
}

export default PlaceNd;