import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';

{
    /* NOTES:

It would be good to have state controlled by the parent using useState, switch to functional components, 
and pass the function controlling the checkboxes as a prop into the component.

I was able to get the items to be controlled individually, but alas I could not figure out how to start with a state of true
and make it work.
*/
}

interface Item {
    title: string;
    checked: boolean;
}

class TodoStore {
    @observable
    public items: Item[] = [
        { title: 'hire great RN dev', checked: false },
        { title: 'willing to volunteer or code for review :)', checked: true }
    ];

    @computed
    public get itemCount(): number {
        return this.items.length;
    }

    @action
    public addItem = (title: string) => {
        this.items.push({ title, checked: false });
    };

    @action
    public toggleItemCheck = (index: number) => {
        this.items[index].checked = !this.items[index].checked;
    };
}

export const TodoScreen: React.FC = observer((props: { titleStringFromParent: string }) => {
    const todoStore = new TodoStore();

    const [checkedStates, setCheckedStates] = useState(
        todoStore.items.reduce((states, item, index) => {
            states[index] = item.checked;
            return states;
        }, {})
    );

    const { titleStringFromParent } = props;

    const toggleCheck = (index: number) => {
        setCheckedStates((prevStates) => {
            return { ...prevStates, [index]: !prevStates[index] };
        });
    };

    return (
        <View>
            <h1>{titleStringFromParent}</h1>
            {todoStore.items.map((item: Item, index) => (
                <View key={index}>
                    <Text>{item.title}</Text>
                    <Button onPress={() => toggleCheck(index)} title={checkedStates[index] ? 'uncheck' : 'check'}></Button>
                </View>
            ))}
        </View>
    );
});

export default TodoStore;
