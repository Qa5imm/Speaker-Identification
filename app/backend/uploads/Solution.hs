module Solution where

-- Question 1
-- Find Odd

findOdd :: [Int] -> Int
findOdd [] = 0
findOdd (x:xs) = if length (filter (==x) (x:xs)) `mod` 2 == 1 then x else findOdd (filter (/=x) xs)

-- Question 2
-- Human Readable Time

humanReadable :: Int -> String
humanReadable seconds = let
    hours = seconds `div` 3600
    minutes = (seconds - hours * 3600) `div` 60
    secs = seconds - hours * 3600 - minutes * 60
    in
        (if hours < 10 then "0" else "") ++ show hours ++ ":" ++
        (if minutes < 10 then "0" else "") ++ show minutes ++ ":" ++
        (if secs < 10 then "0" else "") ++ show secs

-- Question 3
-- Directions Reduction

data Direction = North | East | West | South deriving (Eq, Show)

dirReduce :: [Direction] -> [Direction]
dirReduce [] = []
dirReduce [x] = [x]
dirReduce (x:y:d)
  | null p = [x]
  | (x, v) `elem` [(South, North), (North, South), (East, West), (West, East)] = r
  | otherwise = x:p
  where p = dirReduce(y:d)
        v:r = p

-- Question 4
-- Calculating With Functions

plus x = x (+)
minus x = x (flip (-))
times x = x (*)
dividedBy x = x (flip div)

zero,one,two,three,four,five,six,seven,eight,nine :: Num t1 => (t1 -> t2) -> t2
zero f = f 0
one f = f 1
two f = f 2
three f = f 3
four f = f 4
five f = f 5
six f = f 6
seven f = f 7
eight f = f 8
nine f = f 9

-- Question 5
-- Cakes

type Ingredient = String
type Amount     = Int
type Recipe     = [(Ingredient, Amount)]
type Storage    = [(Ingredient, Amount)]

cakes :: Recipe -> Storage -> Int
cakes recipe storage = minimum $ zipWith (flip div) (map snd recipe) (map ((\x -> if x `elem` map fst storage then snd $ head $ filter ((==x).fst) storage else 0) . fst) recipe)

-- Question 6
-- Sum of Intervals

mySort :: Ord a => [a] -> [a]
mySort [] = []
mySort (x:xs) = mySort [y | y <- xs, y < x] ++ [x] ++ mySort [y | y <- xs, y >= x]

sumOfIntervals :: [(Int, Int)] -> Int
sumOfIntervals = sumOfSortedIntervals . mySort
  where sumOfSortedIntervals []      = 0
        sumOfSortedIntervals [(x,y)] = y-x
        sumOfSortedIntervals ((x1,x2):(y1,y2):xs)
          | x2 > y1   = sumOfIntervals ((x1, max x2 y2):xs)
          | otherwise = x2-x1 + sumOfIntervals ((y1,y2):xs)

-- Question 7
-- Reach The Exit

type Coord = (Int, Int)
type Trail = [Coord]

pathFinder :: String -> Bool
pathFinder maze = fst $ solve (0, 0) []
  where
    field = lines maze
    width = length $ head field
    height = length field

    solve :: Coord -> Trail -> (Bool, Trail)
    solve pos@(x, y) trail
      |    x < 0 || x >= width
        || y < 0 || y >= height
        || field !! y !! x /= '.'
        || pos `elem` trail
        = (False, trail)
      | x == width - 1 && y == height - 1 = (True, trail)
      | otherwise = foldr recurse (False, pos:trail) [(-1,0), (1,0), (0,-1), (0,1)]
      where
        recurse :: Coord -> (Bool, Trail) -> (Bool, Trail)
        recurse (xx, yy) acc@(ok, trail) = if ok then acc else solve (x+xx,y+yy) trail

-- Question 8
-- Next Smaller Number

nextSmaller :: Integer -> Maybe Integer
nextSmaller n = go (n-1)
          where go c
                 | c < m || length (show c) < length (show n) = Nothing
                 | otherwise = if smallerNum c == m then Just c else go (c-1)
                    where m = smallerNum n
                          smallerNum n = read (take 1 zs ++ ys ++ drop 1 zs) :: Integer
                            where
                            zs = mySort $ filter (`elem` "123456789") xs
                            xs = show n
                            ys = filter (=='0') xs

--Question 9
-- Binary Addition

binaryToDecimal :: [Int] -> Int
binaryToDecimal = helper 0
  where
    helper decimal [] = decimal
    helper decimal (x:xs) = helper (2 * decimal + x) xs

decimalToBinary :: Int -> [Int]
decimalToBinary 0 = [0]
decimalToBinary n = reverse (helper n)
  where
    helper 0 = []
    helper n = (n `mod` 2) : helper (n `div` 2)

addBinaries :: [Int]-> [Int]-> [Int]
addBinaries a b = decimalToBinary(binaryToDecimal a + binaryToDecimal b)

--Question 10
-- Tree on Fire

data Tree a = Nil | Node (Tree a) (Int,Int) (Tree a) deriving (Eq, Show)
treeOnFire :: Tree (Int, Int) -> Int -> Int -> Tree(Int, Int)
treeOnFire Nil _ _ = Nil
treeOnFire (Node left (value, burnTime) right) targetValue targetTime = undefined


