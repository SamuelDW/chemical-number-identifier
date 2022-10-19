# chemical-number-identifier
A series of functions that allow you to identify chemical regulation numbers, if they are formatted correctly and if they are valid.

## Installing and Using the Package
```
    npm i kpopfan4life/chemical-number-identifier
```

```js
import identifyChemicalNumber, { identifyChemicalNumbers } from 'kpopfan4life/chemical-number-identifier'

const example = identifyChemicalNumber('KE-12345')
const example2 = identifyChemicalNumbers(['KE-12345, 123-456-7'])
```

## Numbers that are able to be identified
1. CAS Registry Number
2. EC (European Community)
3. KECL Annex 1 (Korean Existing Chemicals List)
4. KECL Annex 2 (Korean Existing Chemicals List)

If you would like more being added, please add an issue with any relevant details, format of the number, name and example numbers. They will be added in due course

## Return Messages
I have tried to keep the return types similar to allow easier use. All functions return an object, with the ones that both check format and validity returning a few extra bits of information.
All objects contain the following.
```js
{
    success: boolean,
    message: string,
    originalInput: string,
}
```

The functions that both check format and validity return the following:
```js
{
    success: boolean,
    message: string,
    originalInput: string,
    type: string, //what regulation it belongs to
    error: boolean, // default false
    formatted: boolean, // if the number is not formatted correctly, default false
    valid: boolean, // if the number is formatted correctly, but is not a valid number default false
}
```
## Why I made this Project
I made this with knowledge I learnt from work, to show that I am learning Node/JS well, as well as benefit anyone who may work in chemical regulations or has an interest in these kind of things. Something to show that I've progressed at least somewhat.

### Baseline
I had made a NPM package many months ago, it was terrible, it had no tests, no documentation no linting or standards and I was basically very new to JS. I'd progressed a lot with Node.js since then.

### Purpose
To show new skills learnt, better practises and testing.

### Goals
To show new skills, allow people with use for chemical regulations/identifying them a package that may help with workflows. Show a better understanding of unit testing.

### Challenges
Developing this did become quite monotonous, due to basically writing the same function, testing dragged me down. However, I got through this by breaking each one down, and taking them one day at a time.

## Future updates
I may transition this into TypeScript, however, not much is going to change, you guys won't see any change, so I think with this one for now it will stay vanilla JS, unless I see enough requests for it.

I will add more functions that you request, but please try to keep them to identifying the numbers. There is scope for others depending on time I can devote to this project.
