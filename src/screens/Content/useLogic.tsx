export function useLogic() {
  const defaultHeader = { headerShown: true };
  const currentHeader = { headerShown: false };

  return { defaultHeader, currentHeader };
}
