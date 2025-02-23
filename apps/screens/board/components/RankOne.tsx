import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import * as svg from 'react-native-svg';

import FaceSkin from '../../../../assets/child-light-skin-tone.svg';
import Crown from '../../../../assets/crown.svg';
import One from '../../../../assets/medal-gold-winner-2.svg';
import { createStyle } from '../styles';
import { useTheme } from 'react-native-paper';
import { RankProps } from './TopTreeRank';


export default
    function RankOne({ 
        playerName,
        score
    }: RankProps) {

    const styles = createStyle(useTheme());
    return (
        <View style={[styles.box, { marginTop: 0 }]}>
            <View style={[styles.faceSkin, { width: 130, height: 130 }]}>
                <svg.Svg width={80} height={80} style={{
                    position: "relative",
                }}>
                    <FaceSkin />
                </svg.Svg>
                <svg.Svg width={80} height={70} style={[styles.crown, { display: "flex" }]}>
                    <Crown />
                </svg.Svg>
                <svg.Svg width={80} height={70} style={[styles.rankTop, { display: "flex" }]}>
                    <One />
                </svg.Svg>
            </View>
            <Text style={styles.playerName} ellipsizeMode='tail' numberOfLines={1}>
                {playerName}
            </Text>
            <Text style={styles.score}>
                {score}
            </Text>
        </View>
    );
}
