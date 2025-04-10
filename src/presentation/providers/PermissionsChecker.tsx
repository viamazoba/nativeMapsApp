import { Children, PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionStore } from "../store/permissions/usePermissionStore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "../router/StackNavigator";


export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if (locationStatus === 'granted') {
            navigation.navigate('MapScreen');
        } else if (locationStatus !== 'undetermined') {
            navigation.navigate('PermissionsScreen')
        }
    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission();
    })

    useEffect(() => {
        // Con esto sabes si la persona sale o entra a la App
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        });

        return () => {
            subscription.remove();
        }
    })


    return (
        <>
            {children}
        </>
    )
}