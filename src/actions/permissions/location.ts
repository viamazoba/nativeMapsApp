import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from "react-native-permissions"
import type { PermissionStatus } from "../../infrastructure/interfaces/permissions"
import { Platform } from "react-native"


export const requestLocationPermission = async (): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable'

    // Se le pide permisos al usuario
    if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error("Unsupported platform");
    }

    // En caso de ser denegados, se le abren los settings al usuario para hacerlo manual
    if (status === 'blocked') {
        await openSettings();
        return checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    }

    return permissionMapper[status] ?? 'unavailable';
}


export const checkLocationPermission = async (): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable'

    // Se varifica si ya se dieron permisos a la app
    if (Platform.OS === 'ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else if (Platform.OS === 'android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error("Unsupported platform");
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    }

    return permissionMapper[status] ?? 'unavailable';
}