export function fisherYates(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function splitIntoGroups(names, groupCount) {
  const shuffled = fisherYates(names);
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    id: i + 1,
    members: []
  }));

  shuffled.forEach((name, index) => {
    groups[index % groupCount].members.push(name);
  });

  return groups;
}

export function splitByMemberCount(names, memberCount) {
  const shuffled = fisherYates(names);
  const groups = [];
  for (let i = 0; i < shuffled.length; i += memberCount) {
    groups.push({
      id: groups.length + 1,
      members: shuffled.slice(i, i + memberCount)
    });
  }
  return groups;
}