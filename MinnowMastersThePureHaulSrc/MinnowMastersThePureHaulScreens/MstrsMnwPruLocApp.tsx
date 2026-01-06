import MyBungalowScreen from './MyBungalowScreen';
import {
    Dimensions as MeasureGridKit,
    View as FrameBucketBox,
    Text as CaptionInkNode,
    Image as RasterSplashPane,
    TouchableOpacity as PressTwigUnit,
    SafeAreaView as GlowMarginPad,
} from 'react-native';
import React, {
    useState as useShuffleLatch,
} from 'react';
import PlanetarySystemMain from './PlanetarySystemMain';
import TheHaunostersGamestrs from './TheHaunostersGamestrs';
import FishermansStories from './FishermansStories';

type DriftNodes =
    | 'the-pure-haul-main'
    | 'MyBungalowScreen'
    | 'Fishermans Stories About Sea'
    | 'Saved Stories minnow'
    | 'The Haul Game nowmaster'
    | 'Minster Game Puresamt';

const screenBoundsPacket = MeasureGridKit.get('window');
const GRID_W = screenBoundsPacket.width;
const GRID_H = screenBoundsPacket.height;

const MstrsMnwPruLocApp: React.FC = () => {
    const [cursorFlag, flipCursorFlag] =
        useShuffleLatch<DriftNodes>('the-pure-haul-main');

    const panelSwitchKernel = (token: DriftNodes) => {
        switch (token) {
            case 'the-pure-haul-main':
                return <PlanetarySystemMain setActiveVector={flipCursorFlag} />;
            case 'MyBungalowScreen':
                return <MyBungalowScreen />;
            case 'Fishermans Stories About Sea':
            case 'Saved Stories minnow':
                return (
                    <FishermansStories
                        activeVector={cursorFlag}
                        setActiveVector={flipCursorFlag}
                    />
                );
            case 'Minster Game Puresamt':
                return <TheHaunostersGamestrs />;
            default:
                return null;
        }
    };

    return (
        <FrameBucketBox
            style={{
                width: GRID_W,
                flex: 1,
                height: GRID_H,
                backgroundColor: '#1D8CD2',
            }}
        >
            {cursorFlag !== 'Saved Stories minnow' &&
                cursorFlag !== 'Fishermans Stories About Sea' && (
                    <RasterSplashPane
                        source={
                            cursorFlag === 'MyBungalowScreen'
                                ? require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/bungalowhouse.png')
                                : require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/wallpaperapp.png')
                        }
                        style={{
                            position: 'absolute',
                            width: GRID_W,
                            height: GRID_H,
                        }}
                        resizeMode="cover"
                    />
                )}

            <GlowMarginPad />

            {cursorFlag !== 'the-pure-haul-main' && (
                <FrameBucketBox
                    style={{
                        alignSelf: 'center',
                        width: GRID_W * 0.91,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: GRID_H * 0.01,
                        alignItems: 'center',
                    }}
                >
                    <PressTwigUnit
                        onPress={() => flipCursorFlag('the-pure-haul-main')}
                    >
                        <RasterSplashPane
                            source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/fishermanback.png')}
                            style={{
                                width: GRID_W * 0.07,
                                height: GRID_W * 0.07,
                            }}
                            resizeMode="contain"
                        />
                    </PressTwigUnit>

                    <CaptionInkNode
                        style={{
                            fontSize: GRID_W * 0.07,
                            fontWeight: '800',
                            color: '#FAAF04',
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 3,
                        }}
                    >
                        {cursorFlag === 'Saved Stories minnow'
                            ? 'Saved Stories'
                            : cursorFlag === 'MyBungalowScreen'
                            ? 'My Bungalow'
                            : cursorFlag === 'The Haul Game nowmaster'
                            ? 'Game'
                            : "Fisherman's Stories"}
                    </CaptionInkNode>

                    <FrameBucketBox
                        style={{ width: GRID_W * 0.07 }}
                    />
                </FrameBucketBox>
            )}

            {panelSwitchKernel(cursorFlag)}
        </FrameBucketBox>
    );
};

export default MstrsMnwPruLocApp;