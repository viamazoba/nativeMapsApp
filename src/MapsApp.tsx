import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from "./presentation/router/StackNavigator"


export const MapsApp = () => {

    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}