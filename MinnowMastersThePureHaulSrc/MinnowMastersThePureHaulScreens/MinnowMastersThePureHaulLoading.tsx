import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView as ChronoSafeDock } from 'react-native-safe-area-context';

const MASTRWS_MINURE_ONBRD_TKN = 'haul-under-tocken-v1-minnowmasters';
import { useNavigation as usePlanetaryNavFlux } from '@react-navigation/native';
import React, {
    useRef as useReferofHaul,
    useEffect as usePureffct,
    useState,
} from 'react';
import {
    Image as StellarVeilPlane,
    Animated as OrbitalPulseAnim,
    Dimensions as Thedimsminn,
    Easing,
} from 'react-native';
import Cloudload from '../MinnowMastersThePureHaulComponents/Cloudload';

const MintextnowDock = ChronoSafeDock;
const MisterViewhaul = OrbitalPulseAnim.View;
const VeilMinnowImg = StellarVeilPlane;
const PulseHaulValue = OrbitalPulseAnim.Value;
const SpinFluxTiming = OrbitalPulseAnim.timing;
const SpinFluxLoop = OrbitalPulseAnim.loop;
const SpinFluxSequence = OrbitalPulseAnim.sequence;

const MinnowMastersThePureHaulLoading: React.FC = () => {
    const navChronoWave = usePlanetaryNavFlux();
    const spanPacket = Thedimsminn.get('window');
    const spanAxisW = spanPacket.width;
    const spanAxisH = spanPacket.height;

    const pulseCore = useReferofHaul(new PulseHaulValue(1)).current;

    const [showLoader, setLoaderPhase] = useState(true);
    const [showLogo, flipLogoGate] = useState(false);
    const logoOpacity = useReferofHaul(new PulseHaulValue(0)).current;

    usePureffct(() => {
        SpinFluxLoop(
            SpinFluxSequence([
                SpinFluxTiming(pulseCore, {
                    toValue: 1.18,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                SpinFluxTiming(pulseCore, {
                    toValue: 1,
                    duration: 900,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    usePureffct(() => {
        let orbitLive = true;
        const entropyDelay = Math.floor(Math.random() * 900);

        const fluxProceed = async () => {
            try {
                const storedMark = await AsyncStorage.getItem(MASTRWS_MINURE_ONBRD_TKN);
                if (!storedMark) {
                    await AsyncStorage.setItem(MASTRWS_MINURE_ONBRD_TKN, 'active');
                }

                setTimeout(() => {
                    if (!orbitLive) return;
                    setLoaderPhase(false);
                    flipLogoGate(true);

                    SpinFluxTiming(logoOpacity, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }).start();

                    setTimeout(() => {
                        if (!orbitLive) return;
                        navChronoWave.replace(
                            storedMark
                                ? 'MstrsMnwPruLocApp'
                                : 'MinnowMastersThePureHaulOnboarding'
                        );
                    }, 1000 + entropyDelay);
                }, 5000);
            } catch (fluxErr) {
                if (__DEV__) console.warn('VibeSpirit::syncFail', fluxErr);
            }
        };

        fluxProceed();

        return () => {
            orbitLive = false;
        };
    }, [navChronoWave, spanAxisW]);

    return (
        <MintextnowDock
            style={{
                justifyContent: 'center',
                backgroundColor: '#281C43',
                width: spanAxisW,
                height: spanAxisH,
                flex: 1,
                alignItems: 'center',
            }}
        >
            <VeilMinnowImg
                source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/wallpaperapp.png')}
                style={{
                    position: 'absolute',
                    width: spanAxisW,
                    height: spanAxisH,
                }}
                resizeMode="cover"
            />

            {showLogo && (
                <MisterViewhaul
                    style={{
                        width: spanAxisW * 0.7,
                        alignItems: 'center',
                        height: spanAxisW * 0.7,
                        justifyContent: 'center',
                        opacity: logoOpacity,
                    }}
                >
                    <StellarVeilPlane
                        source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/logoload.png')}
                        style={{
                            height: spanAxisW * 0.7,
                            width: spanAxisW * 0.7,
                        }}
                        resizeMode="contain"
                    />
                </MisterViewhaul>
            )}

            {showLoader && <Cloudload />}
        </MintextnowDock>
    );
};

export default MinnowMastersThePureHaulLoading;