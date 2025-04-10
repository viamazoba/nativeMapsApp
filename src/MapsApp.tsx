import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from "./presentation/router/StackNavigator"
import { PermissionsChecker } from "./presentation/providers/PermissionsChecker"


export const MapsApp = () => {

    return (
        <NavigationContainer>
            <PermissionsChecker>
                <StackNavigator />
            </PermissionsChecker>
        </NavigationContainer>
    )
}