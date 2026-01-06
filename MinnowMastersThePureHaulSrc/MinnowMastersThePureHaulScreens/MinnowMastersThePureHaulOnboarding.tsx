import { useNavigation as useRouteSwitchHook } from '@react-navigation/native';
import { Text as RuneLabelInk } from 'react-native-gesture-handler';
import React, { useState as useFlipCounter } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themaspurefontsnow } from '../themaspurefontsnow';
import {
    TouchableWithoutFeedback as GhostPressMask,
    View as LayoutCradleBox,
    useWindowDimensions as ScreenMetricOracle,
    Image as PixelCurtainLeaf,
    TouchableOpacity as TapShardFuse,
} from 'react-native';

const VAULT_FLAG_ONBOARD = 'minnowmasters-pure-the-haul-onbrdd';

const MinnowMastersThePureHaulOnboarding: React.FC = () => {
    const [frameIndex, setFrameIndex] = useFlipCounter(0);
    const navStreamCore = useRouteSwitchHook();

    const imageDeckStack = [
        require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/discoverOurApp/TapToDiscover.png'),
        require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/discoverOurApp/CollectFish.png'),
        require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/discoverOurApp/BuildYourBungalow.png'),
        require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/discoverOurApp/StoriesOfTheSea.png'),
        require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/discoverOurApp/LetsDiveIn.png'),
    ];

    const metricBundle = ScreenMetricOracle();
    const spanWide = metricBundle.width;
    const spanTall = metricBundle.height;

    const advanceDeck = async () => {
        if (frameIndex < imageDeckStack.length - 1) {
            setFrameIndex(prev => prev + 1);
        } else {
            try {
                await AsyncStorage.setItem(VAULT_FLAG_ONBOARD, 'complete');
            } catch (cacheFault) {
                if (__DEV__) console.warn('VibeSpirit::onboardSaveFail', cacheFault);
            }
            navStreamCore.replace?.('MstrsMnwPruLocApp');
        }
    };

    const activeBackdrop = imageDeckStack[frameIndex];

    return (
        <GhostPressMask onPress={advanceDeck}>
            <LayoutCradleBox
                style={{
                    height: spanTall,
                    width: spanWide,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <PixelCurtainLeaf
                    resizeMode="cover"
                    source={activeBackdrop}
                    style={{
                        top: 0,
                        height: spanTall,
                        position: 'absolute',
                        width: spanWide,
                        left: 0,
                    }}
                />

                <TapShardFuse
                    activeOpacity={0.9}
                    onPress={() => {
                        navStreamCore.replace?.('MstrsMnwPruLocApp');
                    }}
                    style={{
                        justifyContent: 'center',
                        top: spanTall * 0.082,
                        alignItems: 'center',
                        right: spanWide * 0.05,
                        flexDirection: 'row',
                        position: 'absolute',
                    }}
                >
                    <RuneLabelInk
                        style={{
                            fontSize: spanWide * 0.05,
                            paddingHorizontal: spanWide * 0.04,
                            fontFamily: themaspurefontsnow.planPopSemiBold,
                            color: '#031F4A',
                            fontWeight: '800',
                        }}
                    >
                        Skip
                    </RuneLabelInk>

                    <PixelCurtainLeaf
                        source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/rightArrow.png')}
                        resizeMode="contain"
                        style={{
                            height: spanWide * 0.04,
                            width: spanWide * 0.04,
                        }}
                    />
                </TapShardFuse>
            </LayoutCradleBox>
        </GhostPressMask>
    );
};

export default MinnowMastersThePureHaulOnboarding;