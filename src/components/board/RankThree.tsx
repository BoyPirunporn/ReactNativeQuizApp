import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import * as svg from 'react-native-svg';

import { useTheme } from 'react-native-paper';
import Three from '@/assets/3rd-place-medal.svg';
import FaceSkin from '@/assets/child-light-skin-tone.svg';
import { createStyle } from './styles';
import { RankProps } from './TopTreeRank';
export default function RankThree({
    playerName,
    score
}: RankProps) {
    const theme = useTheme();
    const styles = createStyle(theme);
    return (
        <View style={[styles.box, { marginTop: 30 }]}>
            <View style={[styles.faceSkin, { width: 100, height: 100 }]}>
                <svg.Svg width={60} height={60} style={{
                    position: "relative",
                }}>
                    <FaceSkin />
                </svg.Svg>
                <svg.Svg width={50} height={40} style={[styles.rank, { display: "flex" }]}>
                    <Three />
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
