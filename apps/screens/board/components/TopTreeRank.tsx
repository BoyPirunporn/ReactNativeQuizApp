import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as svg from 'react-native-svg';

import FaceSkin from '../../../../assets/child-light-skin-tone.svg';
import Crown from '../../../../assets/crown.svg';
import One from '../../../../assets/medal-gold-winner-2.svg';
import Two from '../../../../assets/2nd-place-medal.svg';
import Three from '../../../../assets/3rd-place-medal.svg';
import { MD3Theme, useTheme } from 'react-native-paper';
interface TopTreeRankProps {
    boards: IBoard[];
}
export default function TopTreeRank({
    boards
}: TopTreeRankProps) {

    const theme = useTheme();
    const styles = createStyle(theme);
    return (
        <View style={styles.container}>
            {boards.map((item, index) => {
                const showCrown = (index !== 1);
                return (
                    <View key={item.id} style={[styles.box, { marginTop: showCrown ? 30 : 0, }]}>
                        <View style={[styles.faceSkin, { width: showCrown ? 110 : 130, height: showCrown ? 110 : 130 }]}>
                            <svg.Svg width={showCrown ? 60 : 80} height={showCrown ? 60 : 80} style={{
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
                            <svg.Svg width={50} height={40} style={[styles.rank, { display: index !== 0 ? "none" : "flex" }]}>
                                <Two />
                            </svg.Svg>
                            <svg.Svg width={50} height={40} style={[styles.rank, { display: index !== 2 ? "none" : "flex" }]}>
                                <Three />
                            </svg.Svg>
                        </View>
                        <Text style={styles.playerName}>{item.playerName}</Text>
                        <Text
                            style={styles.score}>{item.score}</Text>
                    </View>
                );
            })}
        </View>
    );
}


const createStyle = (theme: MD3Theme) => StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 10,
        margin: 8,
    },
    box: {
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    faceSkin: {
        position: "relative",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    crown: {
        position: "absolute",
        left: 25,
        top: -10,
    },
    rankTop: {
        position: "absolute",
        left: 25,
        top: 95,
    },
    rank: {
        position: "absolute",
        left: 30,
        top: 82,
    },
    playerName: {
        marginTop: 20,
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
    },
    score: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "center",
    }
});