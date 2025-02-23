import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import * as svg from 'react-native-svg';

import FaceSkin from '../../../../assets/child-light-skin-tone.svg';
import Two from '../../../../assets/2nd-place-medal.svg';
import { createStyle } from '../styles';
import { useTheme } from 'react-native-paper';
import { RankProps } from './TopTreeRank';

export default function RankTwo({
    playerName,
    score
}: RankProps) {
    const styles = createStyle(useTheme());
    return (
        <View style={[styles.box, { marginTop: 30 }]}>
            <View style={[styles.faceSkin, { width: 100, height: 100 }]}>
                <svg.Svg width={60} height={60} style={{
                    position: "relative",
                }}>
                    <FaceSkin />
                </svg.Svg>
                <svg.Svg width={50} height={40} style={[styles.rank, { display: "flex" }]}>
                    <Two />
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
