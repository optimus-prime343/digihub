const playAudio = (audioPath: string) => {
  const audio = new Audio(audioPath)
  audio.play()
}
export const playMessageReceivedSound = () =>
  playAudio('/audio/message_received.mp3')

export const playMessageSentSound = () => playAudio('/audio/message_sent.mp3')
