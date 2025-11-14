export enum Feeling {
  Happy = 'happy',
  Sad = 'sad',
  Dead = 'dead'
}

export type IconNames = 'happy-outline' | 'sad-outline' | 'skull-outline'

export const feelings: { type: Feeling; icon: IconNames }[] = [
  { type: Feeling.Happy, icon: 'happy-outline' },
  { type: Feeling.Sad, icon: 'sad-outline' },
  { type: Feeling.Dead, icon: 'skull-outline' },
]

export type ModalEntryType = {
  entryTitle: string,
  entryText: string,
  entryFeeling: Feeling
}

export type DatabaseAddEntryType = {
  email: string | null | undefined,
  timestamp: number,
  title: string,
  content: string,
  feeling: Feeling,
}

export type DatabaseGetEntryType = {
  id: string,
  email: string,
  timestamp: number,
  title: string,
  content: string,
  feeling: Feeling,
}

export const mapFeelingTypeToIcon = (t: Feeling): IconNames => {
  return feelings.find((f) => f.type === t)!.icon
}
