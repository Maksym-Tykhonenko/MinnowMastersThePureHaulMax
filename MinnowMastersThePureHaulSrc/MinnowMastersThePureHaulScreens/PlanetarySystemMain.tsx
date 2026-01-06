import React from 'react';
import {
    TouchableOpacity as PressRippleNode,
    Dimensions as ScreenGaugeUnit,
    Image as PixelMinnowSheet,
    View as LayoutNetCradle,
} from 'react-native';

import inphaulbuts from '../MinnowMastersThePureHaulAssets/InpureData/inphaulbuts';

export default function PlanetarySystemMain({ setActiveVector }: { setActiveVector?: (node: string) => void }) {
    const screenPocket = ScreenGaugeUnit.get('window');
    const spanWide = screenPocket.width;
    const spanTall = screenPocket.height;

    const navGlyphDeck = [
        {
            key: 'game',
            nvto: 'Minster Game Puresamt',
            img: inphaulbuts.game,
        },
        {
            key: 'myBungalow',
            nvto: 'MyBungalowScreen',
            img: inphaulbuts.myBungalow,
        },
        {
            key: 'gotostories',
            nvto: 'Fishermans Stories About Sea',
            img: inphaulbuts.fisherman,
        },
        {
            key: 'savedstories',
            nvto: 'Saved Stories minnow',
            img: inphaulbuts.savedstories,
        },
    ];

    return (
        <LayoutNetCradle style={{
                paddingTop: spanTall * 0.01,
                flex: 1,
                alignItems: 'center',
            }}
        >
            <PixelMinnowSheet
                style={{
                    marginBottom: spanTall * 0.01,
                    height: spanWide * 0.5,
                    width: spanWide * 0.5,
                }}
                resizeMode="contain"
                source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/logoload.png')}
            />

            {navGlyphDeck.map(tileUnit => (
                <PressRippleNode
                    key={tileUnit.key}
                    style={{
                        marginVertical: spanTall * 0.005,
                        alignItems: 'center',
                    }}
                    onPress={() =>
                        setActiveVector && setActiveVector(tileUnit.nvto)
                    }
                >
                    <PixelMinnowSheet
                        source={tileUnit.img}
                        style={{
                            width: spanWide * 0.7,
                            height: spanTall * 0.11,
                        }}
                        resizeMode="contain"
                    />
                </PressRippleNode>
            ))}
        </LayoutNetCradle>
    );
}